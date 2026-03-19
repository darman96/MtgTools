namespace MtgTools.App.Handlers;

public sealed record SearchCardResponse(
    string Name,
    string? ManaCost,
    string? TypeLine,
    string? OracleText,
    string? ImageUri
);

