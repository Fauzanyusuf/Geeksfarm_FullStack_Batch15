const API_URL = `http://${window.location.hostname}:3000/contacts`;

export async function getContacts() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }
  return res.json();
}

export async function addContact(contact) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }
  return res.json();
}

export async function updateContact(id, contact) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }
  return res.json();
}

export async function deleteContact(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }
  return res.json();
}
