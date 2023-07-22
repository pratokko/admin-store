import prismadb from "@/lib/prismadb";
import { BillBoardForm } from "./components/billboards-form";

const Billboard = async ({ params }: { params: { billboardId: string } }) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardForm initialData={billboard}/>
      </div>
    </div>
  );
};
export default Billboard;
