output "vm_public_ip" {
  description = "Public IP address of the Virtual Machine"
  value       = data.azurerm_public_ip.pip_data.ip_address
}

output "vm_fqdn" {
  description = "FQDN of the Virtual Machine"
  value       = data.azurerm_public_ip.pip_data.fqdn
}
