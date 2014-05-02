using System.Web;
using System.Web.Routing;
using System.IO;
using System.Text;
using System.Web.Mvc;

namespace AmplifyDemo.Helpers
{
    public static class AssetAutoloadHelpers
    {
        public static MvcHtmlString BodyClassNames(this HtmlHelper helper)
        {
            PathPartPinPointer p = new PathPartPinPointer(helper);
            string classes = string.Format("{0} {1} {2}", p.Area, p.Controller, p.Action);

            return new MvcHtmlString(classes.ToLower());
        }

        public static MvcHtmlString AreaSpecificCss(this HtmlHelper helper)
        {
            PathPartPinPointer p = new PathPartPinPointer(helper);
            string path = string.Format("Content/App/Areas/{0}.css", p.Area);
            string file = Path.Combine("\\Content", "App", "Areas", p.Area + ".css");
            string link = "";
            HttpContextBase context = helper.ViewContext.HttpContext;

            if (File.Exists(context.Server.MapPath(file)))
            {
                link = string.Format("<link rel=\"stylesheet\" href=\"/{0}\">", path);
            }

            return new MvcHtmlString(link);
        }

        public static MvcHtmlString ViewSpecificRequireJs(this HtmlHelper helper)
        {
            PathPartPinPointer p = new PathPartPinPointer(helper);
            string path = string.Format("Controllers/{0}/{1}/{2}/{2}", p.Area, p.Controller, p.Action);

            return RequireJs(helper.ViewContext.HttpContext, "application.js", path);
        }

        private static MvcHtmlString RequireJs(HttpContextBase context, string config, string module)
        {
            var require = new StringBuilder();

            var jsLocation = "/Scripts/";

            if (File.Exists(context.Server.MapPath(Path.Combine(jsLocation, "App", module + ".js"))))
            {
                require.AppendLine("<script>");
                require.AppendLine("require( ['Scripts/main'], function() {");
                require.AppendLine("    require( [ \"" + module + "\"] );");
                require.AppendLine("});");
                require.AppendLine("</script>");
            }

            return new MvcHtmlString(require.ToString());
        }

        private class PathPartPinPointer
        {
            public PathPartPinPointer(HtmlHelper helper)
            {
                _routeData = helper.ViewContext.RouteData;
            }

            public string Area
            {
                get
                {
                    object area = _routeData.DataTokens["area"] ?? "Default";
                    return area.ToString();
                }
            }

            public string Action
            {
                get
                {
                    return _routeData.Values["action"].ToString();
                }
            }

            public string Controller
            {
                get
                {
                    return _routeData.Values["controller"].ToString();
                }
            }

            private readonly RouteData _routeData;
        }
    }
}