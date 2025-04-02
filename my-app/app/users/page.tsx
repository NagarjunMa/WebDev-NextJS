import { auth } from "@/auth";

export default async function UsersPage() {
    const session = await auth();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Users Page</h1>
            <p>This is a protected page. You can only see it if you&apos;re logged in.</p>

            <div className="mt-4">
                <h2 className="text-xl font-semibold">Your session:</h2>
                <pre className="bg-gray-100 p-4 mt-2 overflow-auto rounded">
                    {JSON.stringify(session, null, 2)}
                </pre>
            </div>
        </div>
    );
}