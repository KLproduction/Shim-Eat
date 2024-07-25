import { checkServerSession } from "@/actions/check-server-session";
import ShowOrder from "./_components/ShowOrder";

const AdminOrderPage = async () => {
  await checkServerSession();
  return (
    <div>
      <ShowOrder />
    </div>
  );
};

export default AdminOrderPage;
