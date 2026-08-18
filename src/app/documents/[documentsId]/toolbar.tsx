"use client";


import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { BoldIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from "lucide-react";


interface ToolbarButtonProps {
    label: string;
    onClick?: () => void;
    isActive?: boolean;
    disabled?: boolean;
    icon: LucideIcon;
};

const ToolbarButton = ({
    label,
    onClick,
    isActive,
    disabled,
    icon: Icon
}: ToolbarButtonProps) => {
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 disabled:opacity-50 disabled:pointer-events-none",
                isActive && "bg-neutral-200/80"
            )}
        >
            <Icon className="size-4" />
        </button>
    )
}

const Toolbar = () => {
    const { editor } = useEditorStore();

    const sections: { 
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
        disabled?: boolean;
    }[][] = [
        [
            {
                label: "Undo",
                icon: Undo2Icon,
                onClick: () => editor?.chain().focus().undo().run(),
                disabled: !editor?.can().undo(),
            },
            {
                label: "Redo",
                icon: Redo2Icon,
                onClick: () => editor?.chain().focus().redo().run(),
                disabled: !editor?.can().redo(),
            },
            {
                label: "Print",
                icon: PrinterIcon,
                onClick: () => window.print()
            },
            {
                label: "Spell Check",
                icon: SpellCheckIcon,
                onClick: () => {
                    const current = editor?.view.dom.getAttribute("spellcheck");
                    editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
                },
            },
        ],
        [
            {
                label: "Bold",
                icon: BoldIcon,
                isActive: editor?.isActive("bold"),
                onClick: () => editor?.chain().focus().toggleBold().run(),
            },
            {
                label: "Italic",
                icon: ItalicIcon,
                isActive: editor?.isActive("italic"),
                onClick: () => editor?.chain().focus().toggleItalic().run(),
            },
            {
                label: "Underline",
                icon: UnderlineIcon,
                isActive: editor?.isActive("underline"),
                onClick: () => editor?.chain().focus().toggleUnderline().run(),
            },
        ],
        [
            {
                label: "Comment",
                icon: MessageSquarePlusIcon,
                onClick: () => console.log("Todo: comment"),
                isActive: false,
            },
            {
                label: "List Todo",
                icon: ListTodoIcon,
                onClick: () => editor?.chain().focus().toggleTaskList().run(),
                isActive: editor?.isActive("taskList"),
            },
            {
                label: "Remove Formatting",
                icon: RemoveFormattingIcon,
                onClick: () => editor?.chain().focus().unsetAllMarks().run(),
            },
        ]
    ];
  return (
    <div className='bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
        {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        {/* todo font familly */}
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        {/* todo heading */}
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        {/* todo font size */}
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
    {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
    ))}
    {/* todo text color */}
    {/* todo highlight color */}
    <Separator orientation="vertical" className="h-6 bg-neutral-300" />
    {/* todo link */}
    {/* todo image */}
    {/* todo Align */}
    {/* todo line height */}
    {/* todo list */}
    {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
    ))}

    </div>
  )
}

export default Toolbar
