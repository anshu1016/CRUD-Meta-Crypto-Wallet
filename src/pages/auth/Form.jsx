import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Form Submitted:", { username });
  };

  return (
    <Form>
      <form onSubmit={handleSubmit}>
        <FormField>
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage>
              {submitted && !username ? "Username is required" : ""}
            </FormMessage>
          </FormItem>
        </FormField>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default SignUp;
