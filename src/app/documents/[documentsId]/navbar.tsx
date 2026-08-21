"use client";

import Image from "next/image"
import Link from "next/link"
import { DocumentInput } from "./document-input";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { BoldIcon, FileIcon, FileJsonIcon, FilePenIcon, FilePlusIcon, FileTextIcon, GlobeIcon, ItalicIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, Strikethrough, StrikethroughIcon, TextIcon, TrashIcon, UnderlineIcon, Undo2Icon } from "lucide-react";
import { BsFilePdf } from "react-icons/bs";

export const Navbar = () => {
    return (
        <nav className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <Link href="/">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={36}
                        height={36}
                    />
                </Link>
                <div className="flex flex-col">
                    <DocumentInput />
                    <div className="flex">
                        <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-mormal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    File
                                </MenubarTrigger>
                                <MenubarContent className="print:hidden bg-white">
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <FileIcon className="size-4 mr-2" />
                                            save
                                        </MenubarSubTrigger>
                                        <MenubarSubContent className="bg-white">
                                            <MenubarItem>
                                                <FileJsonIcon className="size-4 mr-2" />
                                                JSON
                                            </MenubarItem>
                                            <MenubarItem>
                                                <GlobeIcon className="size-4 mr-2" />
                                                HTML
                                            </MenubarItem>
                                            <MenubarItem>
                                                <BsFilePdf className="size-4 mr-2" />
                                                PDF
                                            </MenubarItem>
                                            <MenubarItem>
                                                <FileTextIcon className="size-4 mr-2" />
                                                Text
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarItem>
                                        <FilePlusIcon className="size-4 mr-2" />
                                        New Document
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>
                                        <FilePenIcon className="size-4 mr-2" />
                                        Rename
                                    </MenubarItem>
                                    <MenubarItem>
                                        <TrashIcon className="size-4 mr-2" />
                                        Remove
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem onClick={() => window.print()}>
                                        <PrinterIcon className="size-4 mr-2" />
                                        Print <MenubarShortcut>CTRL + P</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-mormal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    Edit
                                </MenubarTrigger>
                                <MenubarContent className="bg-white">
                                    <MenubarItem>
                                        <Undo2Icon className="size-4 mr-2" />
                                        Undo <MenubarShortcut>CTRL + Z</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem>
                                        <Redo2Icon className="size-4 mr-2" />
                                        Redo <MenubarShortcut>CTRL + Y</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-mormal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    Insert
                                </MenubarTrigger>
                                <MenubarContent className="bg-white">
                                    <MenubarSub>
                                        <MenubarSubTrigger>Table</MenubarSubTrigger>
                                        <MenubarContent className="bg-white">
                                            <MenubarItem>
                                                1 x 1
                                            </MenubarItem>
                                            <MenubarItem>
                                                2 x 2
                                            </MenubarItem>
                                            <MenubarItem>
                                                3 x 3
                                            </MenubarItem>
                                            <MenubarItem>
                                                4 x 4
                                            </MenubarItem>
                                        </MenubarContent>
                                    </MenubarSub>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-mormal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    Format
                                </MenubarTrigger>
                                <MenubarContent className="bg-white">
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <TextIcon className="size-2 mr-2" />
                                            Text
                                        </MenubarSubTrigger>
                                        <MenubarSubContent className="bg-white">
                                            <MenubarItem>
                                                <BoldIcon className="size-4 mr-2" />
                                                Bold <MenubarShortcut>CTRL + B</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem>
                                                <ItalicIcon className="size-4 mr-2" />
                                                Italic <MenubarShortcut>CTRL + I</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem>
                                                <UnderlineIcon className="size-4 mr-2" />
                                                Underline <MenubarShortcut>CTRL + U</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem>
                                                <StrikethroughIcon className="size-4 mr-2" />
                                                <span>Strikethrough&nbsp;&nbsp;</span> <MenubarShortcut>CTRL + S</MenubarShortcut>
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarItem>
                                       <RemoveFormattingIcon className="size-4 mr-2" /> 
                                       Clear formatting
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                </div>
            </div>
        </nav>
    )
}