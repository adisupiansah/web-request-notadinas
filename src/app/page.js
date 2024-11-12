import FormPengisian from "@/components/FormPengisian";
import Judul from "@/components/Judul";


export default function Home() {
 
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
      <Judul />
      <FormPengisian />
    </div>
  );
}
