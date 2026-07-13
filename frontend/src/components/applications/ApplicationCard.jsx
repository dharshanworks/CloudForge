import { useNavigate } from "react-router-dom";

import { deleteApplication } from "../../api/application.api";

function ApplicationCard({
    application,
    onDelete,
}) {
    const navigate = useNavigate();
    const applicationBasePath = `/projects/${application.project}/applications/${application._id}`;

    // ============================
    // Delete Application
    // ============================

    async function handleDelete() {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${application.name}"?\n\nThis action cannot be undone.`
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteApplication(application._id);

            alert(
                "✅ Application deleted successfully."
            );

            // Refresh parent page
            if (onDelete) {
                onDelete();
            }
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Unable to delete application."
            );
        }
    }

    return (
        <div
            style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "24px",
                marginBottom: "24px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                border: "1px solid #e5e7eb",
            }}
        >
            {/* Header */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        color: "#1f2937",
                    }}
                >
                    📦 {application.name}
                </h2>

                <span
                    style={{
                        backgroundColor:
                            application.status === "RUNNING"
                                ? "#16a34a"
                                : application.status === "FAILED"
                                    ? "#dc2626"
                                    : application.status === "DEPLOYING"
                                        ? "#2563eb"
                                        : application.status === "BUILDING"
                                            ? "#f59e0b"
                                            : "#6b7280",
                        color: "#ffffff",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "bold",
                    }}
                >
                    {application.status}
                </span>
            </div>

            {/* Description */}

            <p
                style={{
                    color: "#6b7280",
                    lineHeight: "1.6",
                    marginBottom: "20px",
                }}
            >
                {application.description ||
                    "No description available."}
            </p>

            {/* Information */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(2,1fr)",
                    gap: "16px",
                    marginBottom: "20px",
                }}
            >
                <div>
                    <strong>⚙ Runtime</strong>
                    <div
                        style={{
                            marginTop: "6px",
                        }}
                    >
                        {application.runtime}
                    </div>
                </div>

                <div>
                    <strong>🧩 Framework</strong>
                    <div
                        style={{
                            marginTop: "6px",
                        }}
                    >
                        {application.framework || "-"}
                    </div>
                </div>

                <div>
                    <strong>🌿 Branch</strong>
                    <div
                        style={{
                            marginTop: "6px",
                        }}
                    >
                        {application.branch}
                    </div>
                </div>

                <div>
                    <strong>🐳 Docker Image</strong>
                    <div
                        style={{
                            marginTop: "6px",
                        }}
                    >
                        {application.dockerImage || "-"}
                    </div>
                </div>

                <div>
                    <strong>📂 Repository</strong>
                    <div
                        style={{
                            marginTop: "6px",
                            wordBreak: "break-word",
                        }}
                    >
                        {application.repository || "-"}
                    </div>
                </div>

                <div>
                    <strong>📅 Created</strong>
                    <div
                        style={{
                            marginTop: "6px",
                        }}
                    >
                        {new Date(
                            application.createdAt
                        ).toLocaleDateString()}
                    </div>
                </div>
            </div>

            <hr
                style={{
                    border: "none",
                    borderTop:
                        "1px solid #e5e7eb",
                    marginBottom: "20px",
                }}
            />

            {/* Actions */}

            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                }}
            >
                <button
                    onClick={() => navigate(applicationBasePath)}
                    style={buttonBlue}
                >
                    👁 View
                </button>

                <button
                    onClick={() =>
                        navigate(`${applicationBasePath}/edit`)
                    }
                    style={buttonYellow}
                >
                    ✏ Edit
                </button>
                <button
                    onClick={handleDelete}
                    style={buttonRed}
                >
                    🗑 Delete
                </button>
            </div>
        </div>
    );
}

const buttonBlue = {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "600",
};

const buttonYellow = {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#f59e0b",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "600",
};

const buttonRed = {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#dc2626",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "600",
};

export default ApplicationCard;