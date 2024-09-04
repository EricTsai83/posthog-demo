// distinct_id 大小寫不敏感
export async function getPersonProperties(distinct_id: string) {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.POSTHOG_PERSONAL_API_KEY}`,
    },
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_POSTHOG_HOST}/api/projects/${process.env.POSTHOG_PROJECT_ID}/persons?distinct_id=${distinct_id}`,
    options,
  );
  const data = await response.json();
  return data;
}
