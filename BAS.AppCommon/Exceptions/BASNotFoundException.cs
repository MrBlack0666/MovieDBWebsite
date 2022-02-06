using System;

namespace BAS.AppCommon
{
    public class BASNotFoundException : Exception
    {
        public BASNotFoundException(string message) : base(message)
        {

        }
    }
}
