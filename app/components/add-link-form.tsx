import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@remix-run/react";
import { useRemixForm } from "remix-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const schema = z.object({ title: z.string(), href: z.string().url() });

export type FormData = z.infer<typeof schema>;

export const resolver = zodResolver(schema);

export function AddLinkForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
  });

  return (
    <Form onSubmit={handleSubmit} method="POST">
      <Card>
        <CardHeader>
          <CardTitle>Add new link</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              type="title"
              id="title"
              placeholder="title"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm font-medium text-muted-foreground">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="href">Link</Label>
            <Input
              type="href"
              id="href"
              placeholder="href"
              {...register("href")}
            />
            {errors.href && (
              <p className="text-sm font-medium text-muted-foreground">
                {errors.href.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
