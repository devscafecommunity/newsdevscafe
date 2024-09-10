import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

export default function BlogBc() {
  return (
    <Breadcrumb separator=">">
      <BreadcrumbItem>
        <BreadcrumbLink href="/blog">blog</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/blog/archive">archive</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/blog/saved">saved</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
