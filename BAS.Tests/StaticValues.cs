using System.IO;

namespace BAS.Tests
{
    public static class StaticValues
    {
        public static string SettingsFileName = "appsettings.Tests.json";
        public static string AssetsPath = "Assets";
        public static string TestImageName = "testimage.png";
        public static string TestImagePath = Path.Combine(AssetsPath, TestImageName);
    }
}
