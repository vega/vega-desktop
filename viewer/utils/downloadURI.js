export default function downloadURI(uri, name) {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.append(link);
  link.click();
  document.body.append(link);
}
