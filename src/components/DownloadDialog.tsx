import { Dispatch, SetStateAction, useRef, useState } from "react"
import { z } from "zod"
import download from 'downloadjs';

// icons
import { Download } from 'lucide-react';
import { Loader2 } from "lucide-react"
import { Clock } from 'lucide-react';
import { CircleX } from 'lucide-react';



// components
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area";



import { DownloadFormSchema } from "@/Schema/downloadForm"
import { api } from "@/constants/apis";




// types
type DownloadDialogProps = {
    open: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    data: z.infer<typeof DownloadFormSchema>
}

type DownloadItem = {
    id: number
    name: string
    downloadUrl: string
}





export function DownloadDialog(props: DownloadDialogProps) {

    const [downloadingItems, setDownloadingItems] = useState<number[]>([])
    const [currentDownloadItem, setCurrentDownloadItem] = useState<number | null>(null);
    const downloadList = useRef<number[]>([]);

    const isTemplate = props.data.link.includes("{}")
    const downloadItems: DownloadItem[] = isTemplate ? [] : [{
        id: 1,
        name: props.data.name,
        downloadUrl: props.data.link
    }];

    if (isTemplate) {
        for (let id = Number(props.data.start!); id <= Number(props.data.end!); id += Number(props.data.increment)) {
            const roundedId = Math.round(id * 100) / 100; // Rounding to 2 decimal places
            downloadItems.push({
                id: roundedId,
                name: `${props.data.name}-${roundedId}`,
                downloadUrl: props.data.link.replace("{}", `${roundedId}`)
            });
        }
    }



    async function downloadPDF(id: number, name: string, link: string) {
        return new Promise(async (resolve) => {

            setCurrentDownloadItem(id);
            try {
                // Replace with the actual URL where your PDF is hosted
                const response = await fetch(api + "/download", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        link,
                        compareAttributeName: props.data.compareAttributeName,
                        compareAttributeValue: props.data.compareAttributeValue,
                        downloadAttributeName: props.data.downloadAttributeName
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Get the PDF file as a Blob
                const blob = await response.blob();

                // Use downloadjs to download the file
                await download(blob, name + ".pdf", 'application/pdf');
            } catch (error) {
                console.error('Error downloading the PDF file:', error);
            }




            setCurrentDownloadItem(null);
            removeItemFromDownloadList(id);
            if (downloadList.current.length) {
                const item = downloadItems.find(val => val.id == downloadList.current[0])!
                downloadPDF(item.id, item.name, item.downloadUrl)
            }
            resolve("done");

        })


    }


    function appendItemInDownloadList(id: number) {
        downloadList.current.push(id);
        setDownloadingItems(() => [...downloadList.current]);
    }

    function removeItemFromDownloadList(id: number) {
        downloadList.current = downloadList.current.filter(val => val != id)
        setDownloadingItems(() => [...downloadList.current]);
    }
    function removeAllItemFromDownloadList() {
        if (!currentDownloadItem) return;
        downloadList.current = [currentDownloadItem]
        setDownloadingItems(() => [currentDownloadItem]);
    }
    async function downloadAll() {
        downloadList.current = downloadItems.map(({ id }) => id)
        setDownloadingItems(() => [...downloadList.current]);
        const item = downloadItems[0]
        await downloadPDF(item.id!, item.name, item.downloadUrl)
    }


    return (
        <Dialog open={props.open} onOpenChange={props.setIsOpen}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Downloads</DialogTitle>
                    <DialogDescription>
                        Access and download important documents and resources.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <div className="flex justify-end mb-4">
                        <Button onClick={downloadAll} variant="default"
                            disabled={downloadList.current.length !== 0}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Download All
                        </Button>
                    </div>
                    <ScrollArea className="h-[400px] rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80%]">File Name</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {downloadItems.map((item) => {
                                    const isDownloading = downloadingItems.includes(item.id);

                                    return <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell className="text-right flex gap-2 justify-end">

                                            {
                                                isDownloading
                                                &&
                                                currentDownloadItem != item.id
                                                &&
                                                <Button variant={"destructive"}
                                                    onClick={() => removeItemFromDownloadList(item.id)}
                                                ><CircleX /></Button>
                                            }
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {

                                                    appendItemInDownloadList(item.id)
                                                    if (downloadList.current.length == 1)
                                                        downloadPDF(item.id, item.name, item.downloadUrl)
                                                }}
                                                disabled={isDownloading}
                                            >
                                                {
                                                    isDownloading ? (

                                                        currentDownloadItem == item.id ?
                                                            <Loader2 className="animate-spin" /> :
                                                            <Clock />
                                                    )
                                                        :
                                                        <Download className="mr-2 h-4 w-4" />
                                                }
                                                Download
                                            </Button>

                                        </TableCell>
                                    </TableRow>
                                }
                                )}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </div>
                <DialogFooter>
                    {downloadingItems.length > 1
                        &&
                        <Button
                            variant={'destructive'}
                            onClick={removeAllItemFromDownloadList}
                        >Cancel All</Button>
                    }
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}
