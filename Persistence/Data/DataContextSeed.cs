using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Domain;
using Microsoft.Extensions.Logging;

namespace Persistence.Data
{
    public class DataContextSeed
    {
        public static async Task SeedAsync(DataContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                 if(!context.Locations.Any())
                 {
                     var locationsData = File.ReadAllText("../Persistence/Data/SeedData/locations.json");
                     var locations = JsonSerializer.Deserialize<List<Location>>(locationsData);

                     foreach (var item in locations)
                     {
                         context.Locations.Add(item);
                     }
                     
                     await context.SaveChangesAsync();
                 }

                 if(!context.LocationDistributions.Any())
                 {
                     var locationDistData = File.ReadAllText("../Persistence/Data/SeedData/locationDistributions.json");
                     var locationDists = JsonSerializer.Deserialize<List<LocationDistribution>>(locationDistData);

                     foreach (var item in locationDists)
                     {
                         context.LocationDistributions.Add(item);
                     }
                     
                     await context.SaveChangesAsync();
                 }

                 if(!context.Bookings.Any())
                 {
                     var bookingsData = File.ReadAllText("../Persistence/Data/SeedData/bookings.json");
                     var bookings = JsonSerializer.Deserialize<List<Booking>>(bookingsData);

                     foreach (var item in bookings)
                     {
                         context.Bookings.Add(item);
                     }
                     
                     await context.SaveChangesAsync();
                 }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<DataContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}