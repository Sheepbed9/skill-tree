variable "aws_region" {
  description = "AWS region for all resources."
  type        = string
}

variable "project_name" {
  description = "Short project name, used as a prefix for resource names and as a tag value."
  type        = string
}

variable "ecr_image_uri" {
  description = "Full ECR image URI including tag, e.g. 123456789012.dkr.ecr.<region>.amazonaws.com/<repo>:<tag>."
  type        = string
}

variable "supabase_url" {
  description = "Public Supabase URL baked into the running container at runtime (NEXT_PUBLIC_SUPABASE_URL)."
  type        = string
}

variable "supabase_anon_key" {
  description = "Public Supabase anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY). Anon keys are safe to expose client-side, so this is not a secret."
  type        = string
}
