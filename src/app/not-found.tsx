import Link from "next/link";

export default function NotFound() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "70vh",
                padding: "20px",
                textAlign: "center",
            }}
        >
            <div
                style={{
                    maxWidth: "500px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                }}
            >
                <h1
                    style={{
                        fontSize: "120px",
                        fontWeight: "700",
                        lineHeight: 1,
                        color: "var(--color-accent, #e44848)",
                        margin: 0,
                    }}
                >
                    404
                </h1>
                <h2
                    style={{
                        fontSize: "24px",
                        fontWeight: "600",
                        color: "#101828",
                        margin: 0,
                    }}
                >
                    Ой, сторінку не знайдено!
                </h2>
                <p
                    style={{
                        fontSize: "16px",
                        color: "#475467",
                        lineHeight: 1.5,
                        marginBottom: "24px",
                    }}
                >
                    Схоже, ти звернув(ла) не туди. Кемпер, який ти шукаєш, можливо, вже
                    поїхав у подорож, або такої сторінки ніколи не існувало.
                </p>
                <Link
                    href="/"
                    style={{
                        display: "inline-block",
                        padding: "16px 32px",
                        backgroundColor: "var(--color-accent, #e44848)",
                        color: "white",
                        borderRadius: "200px",
                        textDecoration: "none",
                        fontWeight: "500",
                    }}
                >
                    Повернутися на головну
                </Link>
            </div>
        </div>
    );
}