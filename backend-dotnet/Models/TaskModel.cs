namespace BackendApi.Models
{
    public class TaskModel
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; } = string.Empty;
        public string Status { get; set; } = "Pending";
    }
}
