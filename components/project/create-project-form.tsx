"use client"

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { projectSchema } from "@/lib/schema";
import { WorkspaceMemberProps } from "@/utils/types"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import z from "zod";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Props {
    workspaceMembers: WorkspaceMemberProps[];
}

type ProjectDataType = z.infer<typeof projectSchema>;
export const CreateProjectForm = ( {workspaceMembers}: Props) =>{
    const workspaceId = useWorkspaceId()
    const [pending, setPending] = useState(false)
    const form = useForm<ProjectDataType>({
        resolver: zodResolver(projectSchema),
        defaultValues:{
            name:"",
            description:"",
            memberAccess:[],
            workspaceId: workspaceId as string,
        }
    });
    const handleSubmit = async(data: ProjectDataType) =>{

    }
    return<>
    <Dialog>
        <DialogTrigger asChild>
            <Button size="icon" className="size-5">
                <Plus/>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create new Workspace</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Workspace Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Workspace Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a description..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex flex-row items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={pending}
                >
                  Cancel
                </Button>

                <Button type="submit" disabled={pending}>
                  {pending ? "Creating..." : "Create Workspace"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
        </DialogContent>
    </Dialog>
    </>
}
