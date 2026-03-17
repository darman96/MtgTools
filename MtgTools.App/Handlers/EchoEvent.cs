namespace MtgTools.App.Handlers;

public sealed record EchoEvent(string Message, DateTimeOffset SentAt);
