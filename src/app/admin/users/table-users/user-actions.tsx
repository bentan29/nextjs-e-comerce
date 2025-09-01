'use client'

import { deleteUser } from '@/actions'
import { AlertConfirmDialog } from '@/components'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { slugify } from '@/lib/slugify'
import { Eye, MoreHorizontal, Trash2, UserLock } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props{
  userId: string;
  name: string
}

export const UserActions = ({userId, name}: Props) => {

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleConfirm = async () => {
    try {
      const { ok, message } = await deleteUser(userId);
      if(ok){
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <DropdownMenu>

        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-muted-foreground">Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link
                  href={`/admin/users/${userId}_${slugify(name)}`}
                  className="text-primary flex items-center gap-2"
              >
                <Eye /> View User
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash2 />
                Delete User
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem variant="destructive">
                <UserLock />
                Block User
            </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>

      {/* ---- Dialogo de confirmación ---- */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertConfirmDialog
            title={"Are you sure to delete User?"}
            message={`Name : ${name} / ID : ${userId}`}
            action={ "destroy"}
            onConfirm={handleConfirm}
        />
      </AlertDialog>

    </>
  )
}
