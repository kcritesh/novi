import type { ComponentProps } from "react";
import { CalendarDays } from "lucide-react";

import type { Task } from "@/content/content";
import { Avatar, AvatarStack, Pill } from "@/design-system";
import { cn } from "@/lib/utils";

type TaskCardProps = ComponentProps<"div"> & {
  task: Task;
  lifted?: boolean;
};

export function TaskCard({ task, lifted = false, className, ...props }: TaskCardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-hairline bg-surface p-3 text-left shadow-card",
        lifted && "shadow-lift",
        className,
      )}
      {...props}
    >
      <p className="text-label font-medium text-ink">{task.title}</p>
      <Pill tone={task.tag.tone} className="mt-2">
        {task.tag.label}
      </Pill>
      <div className="mt-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-caption text-muted">
          <CalendarDays aria-hidden className="size-3.5" />
          {task.due}
        </span>
        <AvatarStack>
          {task.assignees.map((person) => (
            <Avatar key={person.name} name={person.name} src={person.photo} tone={person.tone} size="sm" />
          ))}
        </AvatarStack>
      </div>
    </div>
  );
}
