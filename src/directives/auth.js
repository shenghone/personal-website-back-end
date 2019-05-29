import { SchemaDirectiveVisitor } from "graphql-tools";
import { ensureSignIn } from "../auth";

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      const [, , { req }] = args;
      ensureSignIn(req);

      return resolve.apply(this, args);
    };
  }
}

export default AuthDirective;
