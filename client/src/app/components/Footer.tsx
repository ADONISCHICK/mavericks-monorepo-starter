import Image from "next/image";
import Link from "next/link";

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container">
        <div style={{display:"flex",alignItems:"center",gap:12,margin:"18px 0"}}>
          <Image src="/mavericks.png" alt="Mavericks" width={28} height={28}/>
          <strong style={{color:"#cfe6ff"}}>Mavericks Group</strong>
          <div style={{opacity:.7,marginLeft:8}}>• Secure • Quality • Integrity</div>
        </div>

        <div className="cols" style={{marginBottom:22}}>
          <div>
            <h4 style={{marginTop:0,color:"#cfe6ff"}}>Contact</h4>
            <div>The Bristol Office</div>
            <div>2nd Floor, 5 High Street</div>
            <div>Westbury-On-Trym, Bristol, England, BS9 3BY</div>
            <div>Phone: <a href="tel:+447918286078">+44 7918286078</a></div>
            <div>Email: <a href="mailto:admin@themavericksgroup.co.uk">admin@themavericksgroup.co.uk</a></div>
          </div>

          <div>
            <h4 style={{marginTop:0,color:"#cfe6ff"}}>Company</h4>
            <Link href="/about">About Us</Link><br/>
            <Link href="/contact">Contact</Link><br/>
            <Link href="/feedback">Feedback</Link>
          </div>

          <div>
            <h4 style={{marginTop:0,color:"#cfe6ff"}}>Legal</h4>
            <div>Privacy Policy</div>
            <div>Terms & Conditions</div>
            <div>Cookies</div>
          </div>

          <div>
            <h4 style={{marginTop:0,color:"#cfe6ff"}}>Built by</h4>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <Image src="/cloudsailors.png" alt="Cloud Sailors" width={30} height={30} />
              <span>Cloud Sailors Lab</span>
            </div>
          </div>
        </div>

        <div style={{opacity:.6,fontSize:12,display:"flex",justifyContent:"space-between",padding:"12px 0"}}>
          <div>© {new Date().getFullYear()} Mavericks Group. All rights reserved.</div>
          <div>Made with ❤️ by Cloud Sailors Lab</div>
        </div>
      </div>
    </footer>
  );
}
