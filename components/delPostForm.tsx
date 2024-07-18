"use client";

import { delTodo } from "@/actions/del-todo";
import { Button } from "./ui/button";


const DelPostForm = ({ itemId }: { itemId: string }) => {
  return (

    <form action={() => delTodo(itemId)}>   
            <input type="hidden" name="id" value={itemId} />
            <Button type="submit"
            variant="secondary"
            size="sm"
            >Delete</Button>
    </form>
  )
}

export default DelPostForm