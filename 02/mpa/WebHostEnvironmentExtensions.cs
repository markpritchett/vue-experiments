using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace mpa
{
  public static class WebHostEnvironmentExtensions
  {
    public static bool IsClientSideProductionBuild(this IWebHostEnvironment webHostEnvironment)
    {
      return Directory.Exists(webHostEnvironment.GetProductionJsFilePath());
    }

    public static string GetBundlePath(this IWebHostEnvironment webHostEnvironment, string name)
    {
      var productionJsFilePath = webHostEnvironment.GetProductionJsFilePath();

      if (webHostEnvironment.IsClientSideProductionBuild())
      {
        var file = Directory.GetFiles(productionJsFilePath).FirstOrDefault(f => Path.GetFileName(f).StartsWith($"{name}."));

        if (!string.IsNullOrEmpty(file))
        {
          return $"/js/{Path.GetFileName(file)}";
        }
      }
      else
      {
        return $"/{name}.js";
      }

      return string.Empty;
    }

    private static string GetProductionJsFilePath(this IWebHostEnvironment webHostEnvironment)
    {
      return Path.Combine(webHostEnvironment.WebRootPath, "js");
    }
  }
}
