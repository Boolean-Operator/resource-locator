import { BackButton } from "@/components/BackButton";
import Card from "@/components/Card";
import { Users, init as KindeInit } from "@kinde/management-api-js";
import React from "react";

export default async function WorkerPage() {
  KindeInit(); // Initializes the Kinde Management API
  const { users } = await Users.getUsers();

  if (!users) {
    return (
      <>
        <h2 className="text-2xl mb-2">No users found</h2>
        <BackButton title="Go Back" variant="default" />
      </>
    );
  }

  return (
    <div className="container">
      <div className="card start-hero">
        <div>Worker Page</div>
        <p className="text-display-2">
          Your authentication is all sorted.
          <br />
          Build the important stuff.
        </p>
      </div>
      <section className="next-steps-section">
        <h2 className="text-heading-1">Next steps for you</h2>
      </section>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Card
              title={`${user.first_name!} ${user.last_name!}`}
              content="CONTENT"
              description={user.email!}
            />
          </li>
        ))}
      </ul>

      <pre></pre>
    </div>
  );
}
