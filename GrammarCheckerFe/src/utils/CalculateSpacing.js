import { isWidthUp } from "@material-ui/core/withWidth";

export const calculateSpacing = width => {
  if (isWidthUp("lg", width)) {
    return 5;
  }
  if (isWidthUp("md", width)) {
    return 4;
  }
  if (isWidthUp("sm", width)) {
    return 3;
  }
  return 2;
}
