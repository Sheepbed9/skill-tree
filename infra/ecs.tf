# ECS cluster: a logical grouping. Free, just a namespace.
resource "aws_ecs_cluster" "main" {
  name = "${var.project_name}-cluster"

  tags = { Name = "${var.project_name}-cluster" }
}

# Task definition: the recipe for one container.
# Smallest Fargate size (256 CPU = 0.25 vCPU, 512 MB RAM).
resource "aws_ecs_task_definition" "app" {
  family                   = "${var.project_name}-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_task_execution.arn

  container_definitions = jsonencode([
    {
      name      = "app"
      image     = var.ecr_image_uri
      essential = true

      portMappings = [
        {
          containerPort = 3000
          protocol      = "tcp"
        }
      ]

      # Note: NEXT_PUBLIC_* Supabase vars are baked into the JS bundle at
      # docker build time (see Dockerfile ARG blocks). Setting them here as
      # runtime env vars would have no effect, since Next.js inlines them at
      # build, not at runtime. When we add server-side secrets later (e.g. a
      # Supabase service role key), they will appear in this `environment`
      # block, likely sourced from AWS Secrets Manager.
      environment = []

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.ecs.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])

  tags = { Name = "${var.project_name}-task" }
}

# ECS service: keeps `desired_count` tasks running.
# Restarts crashed tasks; drains gracefully on update.
resource "aws_ecs_service" "app" {
  name            = "${var.project_name}-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = aws_subnet.public[*].id
    security_groups  = [aws_security_group.ecs_tasks.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.app.arn
    container_name   = "app"
    container_port   = 3000
  }

  # Service can't register with the target group until the listener exists.
  depends_on = [aws_lb_listener.http]

  tags = { Name = "${var.project_name}-service" }
}
