import { SchemaDirectiveVisitor } from "graphql-tools";
import { ensureSignOut } from "../auth";

class GuestDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      const [, , { req }] = args;
      ensureSignOut(req);

      return resolve.apply(this, args);
    };
  }
}

export default GuestDirective;
