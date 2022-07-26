export type FetchStatus =
  | {
      status: "Success";
    }
  | { status: "Failed"; error: Error }
  | { status: "Loading" };
