import {
  type ActionFunctionArgs,
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { drizzle } from "drizzle-orm/d1";
import { getValidatedFormData } from "remix-hook-form";
import { AddLinkForm, resolver } from "~/components/add-link-form";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { links } from "~/drizzle/schema.server";
import { authenticator } from "~/services/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "H3VAL | Dashboard" },
    { name: "robots", content: "noindex, nofollow" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return json(user);
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<FormData>(request, resolver);
  if (errors) {
    // The keys "errors" and "defaultValues" are picked up automatically by useRemixForm
    return json({ errors, defaultValues });
  }
  const user = await authenticator.isAuthenticated(request, {});
  const db = drizzle(context.cloudflare.env.DB);

  if (user?.id) {
    const formData: FormData = Object.fromEntries(data.entries());
    await db.insert(links).values({
      title: formData.title,
      href: formData.href,
      userId: user.id,
    });
  }

  // Do something with the data
  return json(data);
};

export function DashboardPage() {
  const user = useLoaderData<typeof loader>();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Links</CardTitle>
        </CardHeader>
        <CardContent>Links</CardContent>
        <CardFooter>
          <Button>Add Link</Button>
        </CardFooter>
      </Card>
      <AddLinkForm />
    </div>
  );
}
