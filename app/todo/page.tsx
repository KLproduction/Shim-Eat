import { AddTodoForm } from "@/components/add-todo-form";
import { getTodo } from "@/data/get-todo";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import DelPostForm from "@/components/delPostForm";
import { checkServerSession } from "@/actions/check-server-session";
import { AddTodoFormZod } from "@/components/add-todo-form-with-zod";
import { CardWapper } from "@/components/auth/CardWrapper";

const todoPage = async () => {
  const user = await currentUser();
  const contents = await getTodo(user?.id!);
  const postUser = await getUserById(user?.id!);
  // const check = await checkServerSession();

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <CardWapper headerLabel="To Do List" backBtnHref="/" backBtnLabel="Back">
        <div>{postUser?.id && <AddTodoFormZod userId={postUser.id} />}</div>
        <div className=" flex flex-col items-center justify-center gap-5">
          {contents
            .filter((item) => item.userId === postUser?.id)
            .map((item) => (
              <li
                key={item.id}
                className="flex gap-2 items-center justify-between border w-full"
              >
                {item.content}
                <DelPostForm itemId={item.id} />
              </li>
            ))}
        </div>
      </CardWapper>
    </div>
  );
};

export default todoPage;
