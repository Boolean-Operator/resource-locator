import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
type Props = { title: string; description: string; content: string };

export default function DisplayCard({ title, description, content }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title {title}</CardTitle>
        <CardDescription>Card Description {description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content {content}</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
