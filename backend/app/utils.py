from bson import ObjectId

def serialize_doc(doc):
    """Convert MongoDB document ObjectId to string for JSON response"""
    doc["_id"] = str(doc["_id"])
    return doc

def serialize_list(docs):
    """Convert a list of MongoDB documents"""
    return [serialize_doc(doc) for doc in docs]
