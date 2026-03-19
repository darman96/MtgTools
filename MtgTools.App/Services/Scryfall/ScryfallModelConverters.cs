using Microsoft.Extensions.DependencyInjection;
using MtgTools.Data.Models;
using ScryfallCard = ScryfallClient.Models.Card;
using ScryfallCardFace = ScryfallClient.Models.CardFace;
using ScryfallPreviewInfo = ScryfallClient.Models.PreviewInfo;
using ScryfallRelatedCard = ScryfallClient.Models.RelatedCard;
using ScryfallRuling = ScryfallClient.Models.Ruling;
using ScryfallSet = ScryfallClient.Models.Set;

namespace MtgTools.App.Services.Scryfall;

public interface IScryfallCardConverter
{
    Card Convert(ScryfallCard source);
    IReadOnlyList<Card> Convert(IEnumerable<ScryfallCard> source);
}

public interface IScryfallSetConverter
{
    Set Convert(ScryfallSet source);
    IReadOnlyList<Set> Convert(IEnumerable<ScryfallSet> source);
}

public interface IScryfallRulingConverter
{
    Ruling Convert(ScryfallRuling source);
    IReadOnlyList<Ruling> Convert(IEnumerable<ScryfallRuling> source);
}

public sealed class ScryfallCardConverter : IScryfallCardConverter
{
    public Card Convert(ScryfallCard source)
    {
        ArgumentNullException.ThrowIfNull(source);

        return new Card
        {
            ArenaId = source.ArenaId,
            Id = source.Id,
            Lang = source.Lang,
            MtgoId = source.MtgoId,
            MtgoFoilId = source.MtgoFoilId,
            MultiverseIds = [.. source.MultiverseIds],
            TcgplayerId = source.TcgplayerId,
            TcgplayerEtchedId = source.TcgplayerEtchedId,
            CardmarketId = source.CardmarketId,
            Layout = source.Layout,
            OracleId = source.OracleId,
            PrintsSearchUri = source.PrintsSearchUri,
            RulingsUri = source.RulingsUri,
            ScryfallUri = source.ScryfallUri,
            Uri = source.Uri,
            AllParts = [.. source.AllParts.Select(ConvertRelatedCard)],
            CardFaces = [.. source.CardFaces.Select(ConvertCardFace)],
            Cmc = source.Cmc,
            ColorIdentity = [.. source.ColorIdentity],
            ColorIndicator = [.. source.ColorIndicator],
            Colors = [.. source.Colors],
            Defense = source.Defense,
            EdhrecRank = source.EdhrecRank,
            GameChanger = source.GameChanger,
            HandModifier = source.HandModifier,
            Keywords = [.. source.Keywords],
            Legalities = source.Legalities.ToDictionary(static pair => pair.Key, static pair => pair.Value),
            LifeModifier = source.LifeModifier,
            Loyalty = source.Loyalty,
            ManaCost = source.ManaCost,
            Name = source.Name,
            OracleText = source.OracleText,
            PennyRank = source.PennyRank,
            Power = source.Power,
            ProducedMana = [.. source.ProducedMana],
            Reserved = source.Reserved,
            Toughness = source.Toughness,
            TypeLine = source.TypeLine,
            Artist = source.Artist,
            ArtistIds = [.. source.ArtistIds],
            AttractionLights = [.. source.AttractionLights],
            Booster = source.Booster,
            BorderColor = source.BorderColor,
            CardBackId = source.CardBackId,
            CollectorNumber = source.CollectorNumber,
            ContentWarning = source.ContentWarning,
            Digital = source.Digital,
            Finishes = [.. source.Finishes],
            FlavorName = source.FlavorName,
            FlavorText = source.FlavorText,
            FrameEffects = [.. source.FrameEffects],
            Frame = source.Frame,
            FullArt = source.FullArt,
            Games = [.. source.Games],
            HighresImage = source.HighresImage,
            IllustrationId = source.IllustrationId,
            ImageStatus = source.ImageStatus,
            ImageUris = source.ImageUris.ToDictionary(static pair => pair.Key, static pair => pair.Value),
            Oversized = source.Oversized,
            Prices = source.Prices.ToDictionary(static pair => pair.Key, static pair => pair.Value),
            PrintedName = source.PrintedName,
            PrintedText = source.PrintedText,
            PrintedTypeLine = source.PrintedTypeLine,
            Promo = source.Promo,
            PromoTypes = [.. source.PromoTypes],
            PurchaseUris = source.PurchaseUris.ToDictionary(static pair => pair.Key, static pair => pair.Value),
            Rarity = source.Rarity,
            RelatedUris = source.RelatedUris.ToDictionary(static pair => pair.Key, static pair => pair.Value),
            ReleasedAt = source.ReleasedAt,
            Reprint = source.Reprint,
            ScryfallSetUri = source.ScryfallSetUri,
            SetName = source.SetName,
            SetSearchUri = source.SetSearchUri,
            SetType = source.SetType,
            SetUri = source.SetUri,
            Set = source.Set,
            SetId = source.SetId,
            StorySpotlight = source.StorySpotlight,
            Textless = source.Textless,
            Variation = source.Variation,
            VariationOf = source.VariationOf,
            SecurityStamp = source.SecurityStamp,
            Watermark = source.Watermark,
            Preview = ConvertPreviewInfo(source.Preview)
        };
    }

    public IReadOnlyList<Card> Convert(IEnumerable<ScryfallCard> source)
    {
        ArgumentNullException.ThrowIfNull(source);
        return [.. source.Select(Convert)];
    }

    private static CardFace ConvertCardFace(ScryfallCardFace source) => new()
    {
        Artist = source.Artist,
        ArtistId = source.ArtistId,
        Cmc = source.Cmc,
        ColorIndicator = [.. source.ColorIndicator],
        Colors = [.. source.Colors],
        Defense = source.Defense,
        FlavorText = source.FlavorText,
        IllustrationId = source.IllustrationId,
        ImageUris = source.ImageUris.ToDictionary(static pair => pair.Key, static pair => pair.Value),
        Layout = source.Layout,
        Loyalty = source.Loyalty,
        ManaCost = source.ManaCost,
        Name = source.Name,
        OracleId = source.OracleId,
        OracleText = source.OracleText,
        Power = source.Power,
        PrintedName = source.PrintedName,
        PrintedText = source.PrintedText,
        PrintedTypeLine = source.PrintedTypeLine,
        Toughness = source.Toughness,
        TypeLine = source.TypeLine,
        Watermark = source.Watermark
    };

    private static RelatedCard ConvertRelatedCard(ScryfallRelatedCard source) => new()
    {
        Id = source.Id,
        Component = source.Component,
        Name = source.Name,
        TypeLine = source.TypeLine,
        Uri = source.Uri
    };

    private static PreviewInfo ConvertPreviewInfo(ScryfallPreviewInfo? source) => new()
    {
        PreviewedAt = source?.PreviewedAt,
        SourceUri = source?.SourceUri ?? string.Empty,
        Source = source?.Source ?? string.Empty
    };
}

public sealed class ScryfallSetConverter : IScryfallSetConverter
{
    public Set Convert(ScryfallSet source)
    {
        ArgumentNullException.ThrowIfNull(source);

        return new Set
        {
            Id = source.Id,
            Code = source.Code,
            MtgoCode = source.MtgoCode,
            ArenaCode = source.ArenaCode,
            TcgplayerId = source.TcgplayerId,
            Name = source.Name,
            SetType = source.SetType,
            ReleasedAt = source.ReleasedAt,
            BlockCode = source.BlockCode,
            Block = source.Block,
            ParentSetCode = source.ParentSetCode,
            CardCount = source.CardCount,
            PrintedSize = source.PrintedSize,
            Digital = source.Digital,
            FoilOnly = source.FoilOnly,
            NonfoilOnly = source.NonfoilOnly,
            ScryfallUri = source.ScryfallUri,
            Uri = source.Uri,
            IconSvgUri = source.IconSvgUri,
            SearchUri = source.SearchUri
        };
    }

    public IReadOnlyList<Set> Convert(IEnumerable<ScryfallSet> source)
    {
        ArgumentNullException.ThrowIfNull(source);
        return [.. source.Select(Convert)];
    }
}

public sealed class ScryfallRulingConverter : IScryfallRulingConverter
{
    public Ruling Convert(ScryfallRuling source)
    {
        ArgumentNullException.ThrowIfNull(source);

        return new Ruling
        {
            OracleId = source.OracleId,
            Source = source.Source,
            PublishedAt = source.PublishedAt,
            Comment = source.Comment
        };
    }

    public IReadOnlyList<Ruling> Convert(IEnumerable<ScryfallRuling> source)
    {
        ArgumentNullException.ThrowIfNull(source);
        return [.. source.Select(Convert)];
    }
}

public static class ScryfallModelConverterServiceCollectionExtensions
{
    public static IServiceCollection AddScryfallModelConverters(this IServiceCollection services)
    {
        services.AddSingleton<IScryfallCardConverter, ScryfallCardConverter>();
        services.AddSingleton<IScryfallSetConverter, ScryfallSetConverter>();
        services.AddSingleton<IScryfallRulingConverter, ScryfallRulingConverter>();

        return services;
    }
}

