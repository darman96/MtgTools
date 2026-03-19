using MtgTools.WebView.Messaging;
using ScryfallClient;
using ScryfallClient.Requests;

namespace MtgTools.App.Handlers;

public sealed class SearchCardHandler : IWebMessageHandler<SearchCardRequest, SearchCardResponse>
{
    private readonly IScryfallApiClient scryfallClient;

    public SearchCardHandler(IScryfallApiClient scryfallClient)
    {
        this.scryfallClient = scryfallClient;
    }

    public async Task<SearchCardResponse> HandleAsync(SearchCardRequest request, CancellationToken cancellationToken)
    {
        var card = await scryfallClient.GetCardByNameAsync(new CardNamedSearchRequest
        {
            Fuzzy = request.Query
        });

        string? imageUri = null;
        if (card.ImageUris.TryGetValue("normal", out var normal))
            imageUri = normal;
        else if (card.ImageUris.TryGetValue("small", out var small))
            imageUri = small;
        else if (card.CardFaces.Count > 0)
        {
            var face = card.CardFaces[0];
            if (face.ImageUris.TryGetValue("normal", out var faceNormal))
                imageUri = faceNormal;
            else if (face.ImageUris.TryGetValue("small", out var faceSmall))
                imageUri = faceSmall;
        }

        return new SearchCardResponse(card.Name, card.ManaCost, card.TypeLine, card.OracleText, imageUri);
    }
}




