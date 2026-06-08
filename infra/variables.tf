variable "location" {
  description = "The Azure region to deploy in"
  type        = string
  default     = "East US"
}

variable "vm_size" {
  description = "The VM size"
  type        = string
  default     = "Standard_B1s"
}

variable "public_key" {
  description = "The public SSH key to access the VM"
  type        = string
}
