interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header style={{ padding: "20px 0", fontSize: "28px", fontWeight: "bold" }}>
      <span style={{ fontSize: "32px" }}>🧠</span> {title}
    </header>
  );
}