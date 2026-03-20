using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MtgTools.Data.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Rulings",
                columns: table => new
                {
                    OracleId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Source = table.Column<string>(type: "TEXT", maxLength: 32, nullable: false),
                    PublishedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Comment = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rulings", x => new { x.OracleId, x.Source, x.PublishedAt, x.Comment });
                });

            migrationBuilder.CreateTable(
                name: "Sets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Code = table.Column<string>(type: "TEXT", maxLength: 16, nullable: false),
                    MtgoCode = table.Column<string>(type: "TEXT", nullable: true),
                    ArenaCode = table.Column<string>(type: "TEXT", nullable: true),
                    TcgplayerId = table.Column<int>(type: "INTEGER", nullable: true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 256, nullable: false),
                    SetType = table.Column<string>(type: "TEXT", maxLength: 64, nullable: false),
                    ReleasedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    BlockCode = table.Column<string>(type: "TEXT", nullable: true),
                    Block = table.Column<string>(type: "TEXT", nullable: true),
                    ParentSetCode = table.Column<string>(type: "TEXT", nullable: true),
                    CardCount = table.Column<int>(type: "INTEGER", nullable: false),
                    PrintedSize = table.Column<int>(type: "INTEGER", nullable: true),
                    Digital = table.Column<bool>(type: "INTEGER", nullable: false),
                    FoilOnly = table.Column<bool>(type: "INTEGER", nullable: false),
                    NonfoilOnly = table.Column<bool>(type: "INTEGER", nullable: false),
                    ScryfallUri = table.Column<string>(type: "TEXT", nullable: false),
                    Uri = table.Column<string>(type: "TEXT", nullable: false),
                    IconSvgUri = table.Column<string>(type: "TEXT", nullable: false),
                    SearchUri = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Cards",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ArenaId = table.Column<int>(type: "INTEGER", nullable: true),
                    Lang = table.Column<string>(type: "TEXT", maxLength: 32, nullable: false),
                    MtgoId = table.Column<int>(type: "INTEGER", nullable: true),
                    MtgoFoilId = table.Column<int>(type: "INTEGER", nullable: true),
                    MultiverseIds = table.Column<string>(type: "TEXT", nullable: false),
                    TcgplayerId = table.Column<int>(type: "INTEGER", nullable: true),
                    TcgplayerEtchedId = table.Column<int>(type: "INTEGER", nullable: true),
                    CardmarketId = table.Column<int>(type: "INTEGER", nullable: true),
                    Layout = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    OracleId = table.Column<Guid>(type: "TEXT", nullable: true),
                    PrintsSearchUri = table.Column<string>(type: "TEXT", nullable: false),
                    RulingsUri = table.Column<string>(type: "TEXT", nullable: false),
                    ScryfallUri = table.Column<string>(type: "TEXT", nullable: false),
                    Uri = table.Column<string>(type: "TEXT", nullable: false),
                    Cmc = table.Column<decimal>(type: "TEXT", nullable: false),
                    ColorIdentity = table.Column<string>(type: "TEXT", nullable: false),
                    ColorIndicator = table.Column<string>(type: "TEXT", nullable: false),
                    Colors = table.Column<string>(type: "TEXT", nullable: false),
                    Defense = table.Column<string>(type: "TEXT", nullable: false),
                    EdhrecRank = table.Column<int>(type: "INTEGER", nullable: true),
                    GameChanger = table.Column<bool>(type: "INTEGER", nullable: false),
                    HandModifier = table.Column<string>(type: "TEXT", nullable: false),
                    Keywords = table.Column<string>(type: "TEXT", nullable: false),
                    Legalities = table.Column<string>(type: "TEXT", nullable: false),
                    LifeModifier = table.Column<string>(type: "TEXT", nullable: false),
                    Loyalty = table.Column<string>(type: "TEXT", nullable: false),
                    ManaCost = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 512, nullable: false),
                    OracleText = table.Column<string>(type: "TEXT", nullable: false),
                    PennyRank = table.Column<int>(type: "INTEGER", nullable: true),
                    Power = table.Column<string>(type: "TEXT", nullable: false),
                    ProducedMana = table.Column<string>(type: "TEXT", nullable: false),
                    Reserved = table.Column<bool>(type: "INTEGER", nullable: false),
                    Toughness = table.Column<string>(type: "TEXT", nullable: false),
                    TypeLine = table.Column<string>(type: "TEXT", nullable: false),
                    Artist = table.Column<string>(type: "TEXT", nullable: false),
                    ArtistIds = table.Column<string>(type: "TEXT", nullable: false),
                    AttractionLights = table.Column<string>(type: "TEXT", nullable: false),
                    Booster = table.Column<bool>(type: "INTEGER", nullable: false),
                    BorderColor = table.Column<string>(type: "TEXT", nullable: false),
                    CardBackId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CollectorNumber = table.Column<string>(type: "TEXT", maxLength: 32, nullable: false),
                    ContentWarning = table.Column<bool>(type: "INTEGER", nullable: false),
                    Digital = table.Column<bool>(type: "INTEGER", nullable: false),
                    Finishes = table.Column<string>(type: "TEXT", nullable: false),
                    FlavorName = table.Column<string>(type: "TEXT", nullable: false),
                    FlavorText = table.Column<string>(type: "TEXT", nullable: false),
                    FrameEffects = table.Column<string>(type: "TEXT", nullable: false),
                    Frame = table.Column<string>(type: "TEXT", nullable: false),
                    FullArt = table.Column<bool>(type: "INTEGER", nullable: false),
                    Games = table.Column<string>(type: "TEXT", nullable: false),
                    HighresImage = table.Column<bool>(type: "INTEGER", nullable: false),
                    IllustrationId = table.Column<Guid>(type: "TEXT", nullable: true),
                    ImageStatus = table.Column<string>(type: "TEXT", nullable: false),
                    ImageUris = table.Column<string>(type: "TEXT", nullable: false),
                    Oversized = table.Column<bool>(type: "INTEGER", nullable: false),
                    Prices = table.Column<string>(type: "TEXT", nullable: false),
                    PrintedName = table.Column<string>(type: "TEXT", nullable: false),
                    PrintedText = table.Column<string>(type: "TEXT", nullable: false),
                    PrintedTypeLine = table.Column<string>(type: "TEXT", nullable: false),
                    Promo = table.Column<bool>(type: "INTEGER", nullable: false),
                    PromoTypes = table.Column<string>(type: "TEXT", nullable: false),
                    PurchaseUris = table.Column<string>(type: "TEXT", nullable: false),
                    Rarity = table.Column<string>(type: "TEXT", maxLength: 64, nullable: false),
                    RelatedUris = table.Column<string>(type: "TEXT", nullable: false),
                    ReleasedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Reprint = table.Column<bool>(type: "INTEGER", nullable: false),
                    ScryfallSetUri = table.Column<string>(type: "TEXT", nullable: false),
                    SetName = table.Column<string>(type: "TEXT", nullable: false),
                    SetSearchUri = table.Column<string>(type: "TEXT", nullable: false),
                    SetType = table.Column<string>(type: "TEXT", maxLength: 64, nullable: false),
                    SetUri = table.Column<string>(type: "TEXT", nullable: false),
                    Set = table.Column<string>(type: "TEXT", maxLength: 16, nullable: false),
                    SetId = table.Column<Guid>(type: "TEXT", nullable: false),
                    StorySpotlight = table.Column<bool>(type: "INTEGER", nullable: false),
                    Textless = table.Column<bool>(type: "INTEGER", nullable: false),
                    Variation = table.Column<bool>(type: "INTEGER", nullable: false),
                    VariationOf = table.Column<Guid>(type: "TEXT", nullable: true),
                    SecurityStamp = table.Column<string>(type: "TEXT", nullable: false),
                    Watermark = table.Column<string>(type: "TEXT", nullable: false),
                    PreviewedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    PreviewSourceUri = table.Column<string>(type: "TEXT", maxLength: 2048, nullable: false),
                    PreviewSource = table.Column<string>(type: "TEXT", maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cards_Sets_SetId",
                        column: x => x.SetId,
                        principalTable: "Sets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CardAllParts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    CardId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Component = table.Column<string>(type: "TEXT", maxLength: 64, nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 512, nullable: false),
                    TypeLine = table.Column<string>(type: "TEXT", maxLength: 512, nullable: false),
                    Uri = table.Column<string>(type: "TEXT", maxLength: 2048, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardAllParts", x => new { x.CardId, x.Id });
                    table.ForeignKey(
                        name: "FK_CardAllParts_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CardFaces",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Artist = table.Column<string>(type: "TEXT", maxLength: 256, nullable: false),
                    ArtistId = table.Column<Guid>(type: "TEXT", nullable: true),
                    Cmc = table.Column<decimal>(type: "TEXT", nullable: false),
                    ColorIndicator = table.Column<string>(type: "TEXT", nullable: false),
                    Colors = table.Column<string>(type: "TEXT", nullable: false),
                    Defense = table.Column<string>(type: "TEXT", nullable: false),
                    FlavorText = table.Column<string>(type: "TEXT", nullable: false),
                    IllustrationId = table.Column<Guid>(type: "TEXT", nullable: true),
                    ImageUris = table.Column<string>(type: "TEXT", nullable: false),
                    Layout = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    Loyalty = table.Column<string>(type: "TEXT", nullable: false),
                    ManaCost = table.Column<string>(type: "TEXT", maxLength: 256, nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 512, nullable: false),
                    OracleId = table.Column<Guid>(type: "TEXT", nullable: true),
                    OracleText = table.Column<string>(type: "TEXT", nullable: false),
                    Power = table.Column<string>(type: "TEXT", nullable: false),
                    PrintedName = table.Column<string>(type: "TEXT", maxLength: 512, nullable: false),
                    PrintedText = table.Column<string>(type: "TEXT", nullable: false),
                    PrintedTypeLine = table.Column<string>(type: "TEXT", maxLength: 512, nullable: false),
                    Toughness = table.Column<string>(type: "TEXT", nullable: false),
                    TypeLine = table.Column<string>(type: "TEXT", maxLength: 512, nullable: false),
                    Watermark = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    CardId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardFaces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CardFaces_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CardFaces_CardId",
                table: "CardFaces",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_Cards_Name",
                table: "Cards",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_Cards_OracleId",
                table: "Cards",
                column: "OracleId");

            migrationBuilder.CreateIndex(
                name: "IX_Cards_Set_CollectorNumber",
                table: "Cards",
                columns: new[] { "Set", "CollectorNumber" });

            migrationBuilder.CreateIndex(
                name: "IX_Cards_SetId",
                table: "Cards",
                column: "SetId");

            migrationBuilder.CreateIndex(
                name: "IX_Rulings_OracleId",
                table: "Rulings",
                column: "OracleId");

            migrationBuilder.CreateIndex(
                name: "IX_Sets_Code",
                table: "Sets",
                column: "Code",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CardAllParts");

            migrationBuilder.DropTable(
                name: "CardFaces");

            migrationBuilder.DropTable(
                name: "Rulings");

            migrationBuilder.DropTable(
                name: "Cards");

            migrationBuilder.DropTable(
                name: "Sets");
        }
    }
}
