using Microsoft.AspNetCore.Mvc;
using BackendApi.Services;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatusController : ControllerBase
    {
        private readonly RedisService _redisService;

        public StatusController(RedisService redisService)
        {
            _redisService = redisService;
        }

        [HttpGet]
        public async Task<IActionResult> GetStatus()
        {
            var workerStatus = await _redisService.GetWorkerStatusAsync();
            var redisStatus = _redisService.IsRedisConnected() ? "connected" : "disconnected";

            var status = new
            {
                status = "running",
                version = "1.0.0",
                worker = workerStatus,
                redis = redisStatus
            };

            return Ok(status);
        }
    }
}
