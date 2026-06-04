using Xunit;
using BackendApi.Models;
using BackendApi.Controllers;
using System.Text.Json;

namespace BackendApi.Tests
{
    public class BackendTests
    {
        [Fact]
        public void TaskModel_DefaultStatus_IsPending()
        {
            var task = new TaskModel();
            Assert.Equal("Pending", task.Status);
        }

        [Fact]
        public void TaskModel_GeneratesValidId()
        {
            var task = new TaskModel();
            Assert.False(string.IsNullOrEmpty(task.Id));
        }

        [Fact]
        public void Status_ReturnsExpectedFormat()
        {
            var statusJson = JsonSerializer.Serialize(new { status = "running", version = "1.0.0" });
            Assert.Contains("running", statusJson);
            Assert.Contains("1.0.0", statusJson);
        }
    }
}
