import React from "react";

export default ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content;
    const { status } = comment;

    if (status === "approved") {
      content = comment.content;
    }
    if (status === "pending") {
      content = "🙏 Waiting...";
    }
    if (status === "rejected") {
      content = "❌ Rejected!";
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
