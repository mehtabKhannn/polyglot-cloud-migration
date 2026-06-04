using StackExchange.Redis;
using System.Text.Json;
using BackendApi.Models;

namespace BackendApi.Services
{
    public class RedisService
    {
        private readonly ConnectionMultiplexer _redis;
        private readonly IDatabase _db;

        public RedisService(IConfiguration configuration)
        {
            string redisConn = configuration["REDIS_CONNECTION"] ?? "localhost:6379";
            _redis = ConnectionMultiplexer.Connect(redisConn);
            _db = _redis.GetDatabase();
        }

        public async Task EnqueueTaskAsync(TaskModel task)
        {
            var json = JsonSerializer.Serialize(task);
            await _db.ListLeftPushAsync("tasks_queue", json);
            await _db.HashSetAsync("tasks_completed", task.Id, json);
        }

        public async Task<IEnumerable<TaskModel>> GetAllTasksAsync()
        {
            var tasks = new List<TaskModel>();
            var hashEntries = await _db.HashGetAllAsync("tasks_completed");
            foreach (var entry in hashEntries)
            {
                var task = JsonSerializer.Deserialize<TaskModel>(entry.Value.ToString());
                if (task != null) tasks.Add(task);
            }
            return tasks;
        }

        public async Task<string> GetWorkerStatusAsync()
        {
            var status = await _db.StringGetAsync("worker_status");
            return status.HasValue ? status.ToString() : "stopped";
        }

        public bool IsRedisConnected()
        {
            return _redis.IsConnected;
        }
    }
}
