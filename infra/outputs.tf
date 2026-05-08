output "app_url" {
  description = "Public URL where the skill-tree app is reachable."
  value       = "http://${aws_lb.main.dns_name}"
}

output "ecs_cluster_name" {
  description = "Name of the ECS cluster (useful for AWS CLI debugging)."
  value       = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  description = "Name of the ECS service (useful for AWS CLI debugging)."
  value       = aws_ecs_service.app.name
}

output "log_group_name" {
  description = "CloudWatch log group where container stdout/stderr lands."
  value       = aws_cloudwatch_log_group.ecs.name
}
