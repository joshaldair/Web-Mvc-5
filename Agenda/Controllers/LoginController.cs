using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Agenda.Models;

namespace Agenda.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            ViewBag.Message = "";
            return View();
        }

        [HttpPost]
        public ActionResult Autherize(Agenda.Models.usuarios userModel)
        {
            using ( pruebaEntities db = new pruebaEntities())
           
            {
             

                var userDetails = db.usuarios.Where(x => x.usuario == userModel.usuario && x.clave == userModel.clave).FirstOrDefault();
                if (userDetails == null)
                {

                    ViewBag.Message = "Error";
                    return View("Index", userModel);
                }
                else
                {
                    Session["userID"] = userDetails.id;
                    Session["userName"] = userDetails.nombre;
                    Session["user"] = userDetails.usuario;
                    return RedirectToAction("Index", "Dashboard");
                }
            }
        }

        public ActionResult LogOut()
        {
            string userId = Session["userID"].ToString();
            Session.Abandon();
            Response.AddHeader("Cache-control", "no-store, must-revalidate, private, no-cache");
            Response.AddHeader("Pragma", "no-cache");
            Response.AddHeader("Expires", "0");
            Response.AppendToLog("window.location.reload();");
            return RedirectToAction("Index", "Login");
        }

    }
}