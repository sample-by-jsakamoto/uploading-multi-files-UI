using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MultiFileUpSample.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return Redirect("~/index.html");
        }

        [HttpPost]
        public ActionResult Upload(HttpPostedFileBase[] upfile)
        {
            return View(upfile.Where(f => f != null));
        }
    }
}
