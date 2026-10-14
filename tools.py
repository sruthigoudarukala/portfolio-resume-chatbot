"""Part A: the two tools the bot is allowed to use (mock TechNova data)."""
from langchain_core.tools import tool

ORDERS = {
    "TN1001": {"item": "Laptop Pro 14", "status": "Shipped", "eta": "2 days"},
    "TN1002": {"item": "Noise-cancel Earbuds", "status": "Processing", "eta": "5 days"},
    "TN1003": {"item": "Phone X", "status": "Delivered", "eta": "-"},
}

POLICIES = {
    "returns": "Returns accepted within 30 days in original packaging.",
    "warranty": "All electronics carry a 1-year manufacturer warranty.",
    "shipping": "Free shipping above Rs. 999. Delivery in 3-5 days.",
}


@tool
def get_order_status(order_id: str) -> str:
    """Look up the status of a TechNova order using its order ID, for example TN1001."""
    order = ORDERS.get(order_id.strip().upper())
    if order is None:
        return f"No order found with ID {order_id}."
    return f"Order {order_id}: {order['item']}, status {order['status']}, ETA {order['eta']}."


@tool
def get_policy(topic: str) -> str:
    """Get a TechNova store policy. The topic must be one of: returns, warranty, shipping."""
    return POLICIES.get(topic.strip().lower(), "Sorry, I have no policy on that topic.")


TOOLS = [get_order_status, get_policy]
