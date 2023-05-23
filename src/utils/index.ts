export function generateEntities(tables: any[], links: any[]) {
  return tables
    .map(
      (table) =>
        `model ${table.data.label} {\n ${generateContent(
          table.data.attributes
        )}\n${generateRelations(tables, table, links)}\n}`
    )
    .join("\n");
}

function generateContent(attributes: any[]) {
  return ` ${attributes
    .map((attribute: any) => `\r\t${attribute.name} ${attribute.type}`)
    .join("\n")}`;
}

function generateRelations(tables: any[], table: any, links: any[]) {
  const filteredLinks = links.filter((link: any) => link.source == table.id);
  const data = filteredLinks.map((link: any) => {
    const target = tables.find((table: any) => table.id == link.target);
    return {
      target: target.data.label,
    };
  });

  return `${data
    .map((link) => `\r\t${link.target.toLowerCase()} ${link.target}`)
    .join("\n")}`;
}
