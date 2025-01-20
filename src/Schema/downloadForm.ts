import { z } from "zod"

const DownloadFormSchema = z.object({
    name: z.string(),
    link: z.string(),

    start: z.string().optional(),

    end: z.string().optional(),

    increment: z.preprocess(
        (val) => (typeof val === 'string' ? parseFloat(val) : val),
        z.number().min(0).optional()
    ),

    compareAttributeName: z.string()
        .min(1, { message: 'Compare Attribute Name cannot be empty.' }),

    compareAttributeValue: z.string()
        .min(1, { message: 'Compare Attribute value cannot be empty.' }),

    downloadAttributeName: z.string()
        .min(1, { message: 'Download Attribute Name cannot be empty.' }),
}).refine((data) => {
    // Only validate if both start and end are provided
    if (data.link.includes("{}")) {
        const start = Number(data.start);
        const end = Number(data.end);

        // Ensure that end is greater than start
        return end > start;
    }
    return true; // No validation if start or end is missing
}, {
    message: 'End must be greater than start',
    path: ['end'], // This will attach the error message to the `end` field
});


export { DownloadFormSchema }